import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"

fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    marginBottom: "1.45rem",
  },
  a: {
    backgroundImage: "none",
    textShadow: "none",
  },
  blockquote: {
    fontStyle: "normal",
  },
})

const typography = new Typography(fairyGatesTheme)

export default typography
