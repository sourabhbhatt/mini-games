// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Loading() {
  const session = true;
  if (!session) {
    redirect("/");
  }
  return (
    <main className="flex flex-col h-screen overflow-auto">
      <div className="text-center m-auto">
        <div className="w-60 h-60">
          <div className="cssload-wrap">
            <div className="cssload-cssload-spinner"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
