'use client'

import { FormComponentProps } from "../CreateShow";

// If user input is a youtue video url, use this function to convert it to an embedable url, else use the
// url of the user. 
function extractYouTubeEmbedURL(url: string): string | null {
    // Define a regular expression to match the video ID
    const regex = /\/([^/]+)$/;
  
    // Use the regular expression to extract the video ID
    const match = url.match(regex);
  
    // Check if a match is found
    if (match) {
      // Extract the video ID from the match
      const extractedID = match[1];
  
      // Construct the embed URL and return it
      return `https://www.youtube.com/embed/${extractedID}`;
    } else {
      // Return null if no match is found
      return null;
    }
  }

  const CreatePressVideo: React.FC<FormComponentProps> = ({document, entry, section}) => {
    return (
        <h1>Hi</h1>
    )
  }

  export default CreatePressVideo;