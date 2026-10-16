import tailwindcss from "@tailwindcss/postcss"
import cascadeLayers from "@csstools/postcss-cascade-layers"

/**
 * Tailwind v4 的 PostCSS 入口是 @tailwindcss/postcss（内置 Lightning CSS，不再使用 autoprefixer）。
 * @csstools/postcss-cascade-layers 必须排在它后面：Tailwind 在 Once 里产出 @layer，
 * 这个插件在 OnceExit 里把 @layer 展成特异度模拟。
 * 不要再叠 postcss-preset-env 的 cascade-layers：那是同一个变换，跑两次会把特异度阶梯乘两遍。
 */
export default {
  plugins: [
    tailwindcss(),
    cascadeLayers({
      onRevertLayerKeyword: "warn",
      onConditionalRulesChangingLayerOrder: "warn",
      onImportLayerRule: "warn",
    }),
  ],
}
