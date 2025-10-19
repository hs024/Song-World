const { log } = require("console");
const fs = require("fs");
const path = require("path");

// Folders
const musicFolder = path.join(__dirname, "./MusicPlayer/public/music"); // path to your music files
const imageFolder = path.join(__dirname, "./MusicPlayer/public/images"); // path to your cover images

// Get all files
const musicFiles = fs
  .readdirSync(musicFolder)
  .filter((f) => f.endsWith(".mp3"));
const imageFiles = fs
  .readdirSync(imageFolder)
  .filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

// Function to generate JSON array
const songs = musicFiles.map((file, index) => {
  // Try to match cover image by name (without extension)
  const nameWithoutExt = path.parse(file).name.toLowerCase();
  const cover =
    imageFiles.find((img) =>
      path.parse(img).name.toLowerCase().includes(nameWithoutExt)
    ) || "";
    const data = {
      id: index + 1,
      title: nameWithoutExt.replace(/[-_]/g, " "), // replace underscores/dashes with spaces
      writer: "", // You can fill manually later if needed
      musicLocation: `./music/${file}`,
      cover: cover ? `./images/${cover}` : "",
    };
    console.log(data);
    
  return {
    id: index + 1,
    title: nameWithoutExt.replace(/[-_]/g, " "), // replace underscores/dashes with spaces
    writer: "", // You can fill manually later if needed
    musicLocation: `./music/${file}`,
    cover: cover ? `./images/${cover}` : "",
  };
});

// Write JSON file
fs.writeFileSync(
  path.join(__dirname, "musicData.json"),
  JSON.stringify(songs, null, 2)
);

console.log("musicdata.json created successfully!");
