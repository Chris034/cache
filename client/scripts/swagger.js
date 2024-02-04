const { generateApi, generateTemplates } = require('swagger-typescript-api');
const path = require("path");
const fs = require("fs");

const url = `${process.env.REACT_APP_ENV === 'production'
? process.env.REACT_APP_API_PROD_ENDPOINT
: process.env.REACT_APP_API_DEV_ENDPOINT}/docs.json`

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: "API.ts",
  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), "./src/api"),
  url: url,
  httpClientType: "fetch", // or "fetch"
  defaultResponseAsSuccess: false,
  generateClient: true,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: false,
  extractRequestBody: false,
  extractEnums: false,
  unwrapResponseData: false,
  defaultResponseType: "void",
  singleHttpClient: true,
  cleanOutput: false,
  enumNamesAsValues: false,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  typePrefix: '',
  typeSuffix: '',
  enumKeyPrefix: '',
  enumKeySuffix: '',
  addReadonly: false,
  sortTypes: false,
  sortRouters: false,
  extractingOptions: {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: ["Error", "Fail", "Fails", "ErrorData", "HttpError", "BadResponse"],
  },
  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates: [],
  anotherArrayType: false,
  fixInvalidTypeNamePrefix: "Type",
  fixInvalidEnumKeyPrefix: "Value", 
  codeGenConstructs: (constructs) => ({
    ...constructs,
    RecordType: (key, value) => `MyRecord<key, value>`
  }),
  primitiveTypeConstructs: (constructs) => ({
      ...constructs,
      string: {
        'date-time': 'Date'
      }
  }),
  hooks: {
    onCreateComponent: (component) => {},
    onCreateRequestParams: (rawType) => {},
    onCreateRoute: (routeData) => {},
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    onFormatRouteName: (routeInfo, templateRouteName) => {},
    onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
    onInit: (configuration) => {},
    onPreParseSchema: (originalSchema, typeName, schemaType) => {},
    onParseSchema: (originalSchema, parsedSchema) => {},
    onPrepareConfig: (currentConfiguration) => {},
  }
})
  .then(({ files, configuration }) => {
    // files.forEach(({ content, name }) => {
    //   fs.writeFile(path, content);
    // });
  })
  .catch(e => console.error(e))


// generateTemplates({
//   cleanOutput: false,
//   output: "./api",
//   httpClientType: "fetch",
//   modular: false,
//   silent: false,
//   rewrite: false,
// })
