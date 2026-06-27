import { getHeader, parseGmailMessage } from "@/app/gmail/component/gmail-utils";

export type PurchaseRecord = {
  id: string;
  subject: string;
  from: string;
  merchant: string;
  date: string;
  monthKey: string;
  monthLabel: string;
  amount: number | null;
  snippet: string;
};

export type MonthlyPurchaseStat = {
  monthKey: string;
  label: string;
  count: number;
  amount: number;
};

export type MerchantPurchaseStat = {
  name: string;
  count: number;
  amount: number;
};

export type PurchaseAnalytics = {
  total: number;
  totalSpend: number;
  withAmount: number;
  monthly: MonthlyPurchaseStat[];
  merchants: MerchantPurchaseStat[];
  recent: PurchaseRecord[];
};

function extractMerchant(from: string) {
  const named = from.match(/^"?([^"<]+)"?\s*</);
  if (named?.[1]?.trim()) {
    return named[1].trim().replace(/\s+/g, " ").slice(0, 28);
  }
  const email = from.match(/[\w.-]+@([\w.-]+)/);
  if (email?.[1]) {
    const domain = email[1].split(".")[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }
  return from.slice(0, 28) || "Unknown";
}

function extractAmount(text: string): number | null {
  const match = text.match(/\$\s?([\d,]+(?:\.\d{2})?)/);
  if (!match?.[1]) return null;
  const value = Number.parseFloat(match[1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : null;
}

function getMessageDate(message: {
  internalDate?: string;
  payload?: { headers?: Array<{ name: string; value: string }> };
}) {
  const dateHeader = getHeader(message, "date");
  if (dateHeader) return new Date(dateHeader);
  if (message.internalDate) return new Date(Number(message.internalDate));
  return new Date();
}

export function buildPurchaseAnalytics(
  messages: Parameters<typeof parseGmailMessage>[0][],
): PurchaseAnalytics {
  const records: PurchaseRecord[] = messages.map((message) => {
    const parsed = parseGmailMessage(message);
    const date = getMessageDate(message);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    const amount = extractAmount(
      `${parsed.subject} ${parsed.snippet}`,
    );

    return {
      id: parsed.id,
      subject: parsed.subject,
      from: parsed.from,
      merchant: extractMerchant(parsed.from),
      date: parsed.date,
      monthKey,
      monthLabel,
      amount,
      snippet: parsed.snippet,
    };
  });

  const monthMap = new Map<string, MonthlyPurchaseStat>();
  const merchantMap = new Map<string, MerchantPurchaseStat>();

  for (const record of records) {
    const month = monthMap.get(record.monthKey) ?? {
      monthKey: record.monthKey,
      label: record.monthLabel,
      count: 0,
      amount: 0,
    };
    month.count += 1;
    if (record.amount) month.amount += record.amount;
    monthMap.set(record.monthKey, month);

    const merchant = merchantMap.get(record.merchant) ?? {
      name: record.merchant,
      count: 0,
      amount: 0,
    };
    merchant.count += 1;
    if (record.amount) merchant.amount += record.amount;
    merchantMap.set(record.merchant, merchant);
  }

  const monthly = [...monthMap.values()]
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    .slice(-6);

  const merchants = [...merchantMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const totalSpend = records.reduce(
    (sum, r) => sum + (r.amount ?? 0),
    0,
  );

  return {
    total: records.length,
    totalSpend,
    withAmount: records.filter((r) => r.amount !== null).length,
    monthly,
    merchants,
    recent: records.slice(0, 6),
  };
}
