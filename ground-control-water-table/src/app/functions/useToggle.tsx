// I decided to make the show / hide functionality it's own function / hook
// As it's a fairly commonly use function and I can see it being reused throughout the app
// if this were to become a real project

// I currently only use this in a few places - however there is show / use functionality
// on the tables page as well as the show / hide functionality for the pop up functionality on 
// the map page - so I would expand this hook to be versitile enough to be reusable in all of those situations
import { useState } from "react";

export const useToggle = (initial = false) => {
  const [visible, setVisible] = useState(initial);

  function toggle() {
    setVisible((prev) => !prev);
  }

  return [visible, toggle];
};
