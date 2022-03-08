import React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
function Footer() {
  return (
    <div className="flex items-center justify-center font-body mb-7">
      <span className="mr-3 text-[0.8rem]"> © Made by JamesNguyen</span>
      <a href="https://github.com/jamesnguyenn" target="_blank">
        <GitHubIcon></GitHubIcon>
      </a>
    </div>
  );
}

export default Footer;
