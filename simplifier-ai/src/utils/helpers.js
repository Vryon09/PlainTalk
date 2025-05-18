export function formattedOutput(result) {
  const res = result
    .split("**")
    .join("")
    .split("\n")
    .map((sen) =>
      sen
        .replaceAll("#", "")
        .replaceAll("---", "")
        .replaceAll("undefined", "")
        .trim(),
    )
    .filter((sen) => sen !== "");

  const pairs = [];

  for (let i = 0; i < res.length; i += 2) {
    pairs.push(res[i] + res[i + 1]);
  }

  return pairs;
}

export async function handleCopy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
