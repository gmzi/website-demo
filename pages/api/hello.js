export default async function handler(
  req,
  res
) {
  try {
    return res.status(200).json({message: "hello buddy"});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
}
