import Calendar from "./calendar/page";
import LoginButton from "./components/LoginButton";
import CreateDraftButton from "./gmail/page";

export default function Home() {
  return (
    <>
      <LoginButton />
      {/*
      <Calendar /> */}
      <CreateDraftButton/>
    </>
  );
}
