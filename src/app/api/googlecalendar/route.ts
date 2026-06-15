import { NextResponse } from "next/server";
import { getAuthenticatedCorsairTenant } from "@/lib/corsair-auth";
import { getSession } from "@/lib/server";

type CreateEventRequestBody = {
  calendarId?: string;
  event: {
    summary: string;
    description?: string;
    location?: string;
    start: {
      dateTime: string;
      timeZone?: string;
    };
    end: {
      dateTime: string;
      timeZone?: string;
    };
    attendees?: Array<{ email: string }>;
  };
};

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Failed to handle Google Calendar request";
}

function getErrorStatus(error: unknown) {
  const message = getErrorMessage(error);
  if (message.includes("Unauthorized") || message.includes("not connected")) {
    return 401;
  }
  if (message.includes("not granted") || message.includes("not configured")) {
    return 403;
  }
  return 500;
}

async function requireSession() {
  const session = await getSession();

  if (!session?.user) {
    return {
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  return { userId: session.user.id };
}

export async function POST(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const body = (await request
      .json()
      .catch(() => ({}))) as CreateEventRequestBody;

    if (!body.event) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required 'event' payload.",
        },
        { status: 400 },
      );
    }

    const tenant = await getAuthenticatedCorsairTenant(auth.userId);
    const createdEvent = await tenant.googlecalendar.api.events.create({
      calendarId: body.calendarId ?? "primary",
      event: body.event,
    });

    return NextResponse.json(
      {
        success: true,
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating Google Calendar event:", error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      { status: getErrorStatus(error) },
    );
  }
}

export async function GET(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const calendarId = url.searchParams.get("calendarId") ?? "primary";
    const id = url.searchParams.get("id");

    const tenant = await getAuthenticatedCorsairTenant(auth.userId);

    if (id) {
      const event = await tenant.googlecalendar.api.events.get({
        calendarId,
        id,
      });

      return NextResponse.json(
        {
          success: true,
          event,
        },
        { status: 200 },
      );
    }

    const eventsResponse = await tenant.googlecalendar.api.events.getMany({
      calendarId,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
      maxResults: 100,
    });

    return NextResponse.json(
      {
        success: true,
        events: eventsResponse.items ?? [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling GET request for Google Calendar:", error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      { status: getErrorStatus(error) },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const calendarId = url.searchParams.get("calendarId") ?? "primary";
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required 'id' parameter for deletion.",
        },
        {
          status: 400,
        },
      );
    }

    const tenant = await getAuthenticatedCorsairTenant(auth.userId);

    await tenant.googlecalendar.api.events.delete({
      calendarId,
      id,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Event ${id} successfully deleted.`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting Google Calendar event:", error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      {
        status: getErrorStatus(error),
      },
    );
  }
}
