import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"

fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({})

const typography = new Typography(fairyGatesTheme)

export default typography
