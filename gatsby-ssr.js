const React = require("react")

const HeadComponents = [
  <script
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9872787679648951"
    crossOrigin="anonymous"
    async
  />,
]

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents)
}
