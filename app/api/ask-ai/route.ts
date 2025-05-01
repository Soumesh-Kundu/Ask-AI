import { askAI } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
const commandsRegex =
  /summerize|extract-keywords|sentiment-analysis|complete|translate-to-[a-zA-Z]+/;

export async function POST(request: NextRequest) {
  try {
    const { tasks, content } = (await request.json()) as {
      tasks: string[];
      content: string;
    };
    if(!tasks || !content) {
      return NextResponse.json({ error: "Missing tasks or content" }, { status: 400 });
    }
    if (tasks.length === 0) {
      return NextResponse.json({ error: "No tasks provided" }, { status: 400 });
    }
    const requirePipeLine =
      (request.nextUrl.searchParams.get("pipeline") || "false") === "true";

    for (const task of tasks) {
      if (!commandsRegex.test(task)) {
        return NextResponse.json({ error: `Invalid task: ${task}` });
      }
    }
    const response = await askAI(tasks, content);
    const responses = response.split("\n").filter((res) => res.trim() !== "");
    const returningData: { [key: string]: any } = {
      tasks,
      content,
      response: responses.at(-1),
    };
    if (response === "404") {
      return NextResponse.json(
        { error: "Invalid language code or language" },
        { status: 404 }
      );
    }
    const pipeLined = [];
    if (requirePipeLine) {
      for (let i = 0; i < tasks.length; i++) {
        pipeLined.push({
          [tasks[i]]: responses[i],
        });
      }
      returningData["pipeline"] = pipeLined;
    }
    return NextResponse.json(returningData, { status: 200 });
  } catch (error) {
    console.error("Error in askAI API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
