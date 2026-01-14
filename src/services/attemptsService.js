import { supabase } from "./supabase";

export async function saveFailedAttempt({
  name,
  difficulty,
  score,
  timeLeft,
  reason,
}) {
  try {
    const { error } = await supabase.from("game_attempts").insert([
      {
        name,
        difficulty,
        score,
        time_left: timeLeft,
        reason,
      },
    ]);

    if (error) {
      console.error("Failed to save game attempt:", error);
    }
  } catch (err) {
    console.error("Unexpected error saving attempt:", err);
  }
}
