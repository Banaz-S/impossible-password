import { supabase } from "../utils/supabase";

export const saveScoreToSupabase = async ({
  name,
  difficulty,
  score,
  timeLeft,
}) => {
  const { error } = await supabase.from("ranking").insert([
    {
      name,
      difficulty,
      score,
      time_left: timeLeft,
    },
  ]);

  if (error) {
    console.error("Error saving score:", error);
  }
};

export const getRankingFromSupabase = async () => {
  const { data, error } = await supabase
    .from("ranking")
    .select("*")
    .order("score", { ascending: false })
    .order("time_left", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching ranking:", error);
    return [];
  }

  return data;
};
