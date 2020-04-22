import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"

fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    backgroundImage: "none",
    textShadow: "none",
  },
  span: {
    display: "inline-block",
    marginBottom: rhythm(1 / 4),
    fontSize: rhythm(1 / 1.75),
  },
})

const typography = new Typography(fairyGatesTheme)

export default typography
