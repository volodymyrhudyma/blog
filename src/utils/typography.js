import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"

fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    marginBottom: "1.45rem",
  },
  a: {
    backgroundImage: "none",
    textShadow: "none",
    color: "#1f7504",
  },
  blockquote: {
    fontStyle: "normal",
    fontSize: "inherit",
    marginLeft: "0!important",
  },
})

const typography = new Typography(fairyGatesTheme)

export default typography
