export function transformYouTubeUrl(inputURL) {
    // Check if the input URL matches the standard YouTube format
    const match = inputURL.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  
    if (match) {
      const videoId = match[1];
      // Construct the embed URL
      const embedURL = `https://www.youtube.com/embed/${videoId}`;
      return embedURL;
    } else {
      // If the input URL doesn't match the expected format, return it unchanged
      return false;
    }
  }
  
  // Example usage:
//   const inputURL = "https://www.youtube.com/watch?v=73wnMHftomo";
//   const embedURL = transformYouTubeURL(inputURL);
//   console.log(embedURL); // Output: "https://www.youtube.com/embed/73wnMHftomo"
  