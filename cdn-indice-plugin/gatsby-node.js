/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = (_, pluginOptions) => console.log("Loaded gatsby-starter-plugin")

const path = require(`path`);

const { buildIndex } = require(`./lib/index`);

const publicPath = path.resolve("./public");

exports.createPages = async ({ graphql }, pluginOptions) => {
  delete pluginOptions.plugins;
  await buildIndex(graphql, publicPath, pluginOptions);
}

exports.pluginOptionsSchema = ({ Joi }) => {
  
  return Joi.object({
    // Validate that the anonymize option is defined by the user and is a boolean
    idAttr: Joi.string().required(),
    dataAttrs: Joi.array(),
    graphQL: Joi.string().required(),
    chunkSize: Joi.number(),
    normalizer: Joi.function().required(),
    indice: Joi.array(),
    engine: Joi.object().required()
  })
}