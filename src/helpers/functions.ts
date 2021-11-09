import crypto from 'crypto'
import fs from 'fs'
import readline from 'readline'
import util from 'util'

export const parseFileContent = async (
  args: InitProps,
  content?: string[]
): Promise<string> => {
  if (!content || content.length === 0) return ''
  const stringContents = content
    .join('\n')
    .replace(/\$L\:APP_NAME/g, args.appName.toLowerCase())
    .replace(/\$APP_NAME/g, args.appName)
    .replace(/\$DB_HOST/g, args.dbHost || '')
    .replace(/\$DB_USER/g, args.dbUser || args.appName.toLowerCase())
    .replace(/\$DB_PASS/g, args.dbPass || args.appName.toLowerCase())
    .replace(/\$DB_NAME/g, args.dbName || args.appName.toLowerCase())
    .replace(/\$F\:RANDOM_STRING/g, crypto.randomBytes(64).toString('hex'))
    .replace(/\$AUTHOR/g, args.author || 'LombokTS')
    .replace(
      /\$GIT_URL/g,
      args.gitUrl ||
      'https://github.com/lombokts/' +
      args.appName.toLowerCase() +
      '.git'
    )
    .replace(
      /\$SWAGGER_USER/g,
      args.swaggerUser || args.appName.toLowerCase()
    )
    .replace(
      /\$SWAGGER_PASS/g,
      args.swaggerPass || args.appName.toLowerCase()
    )
  return stringContents
}

export const initDir = async (
  trees: TreeItem[],
  args: InitProps,
  rootDir: string
) => {
  for (const tree of trees) {
    const fullPath = rootDir + '/' + tree.name
    const exists = fs.existsSync(fullPath)
    if (exists) continue
    if (tree.type === 'directory') {
      // console.log('creating directory', chalk.green(fullPath))
      fs.mkdirSync(fullPath)
      if (tree.childs) {
        initDir(tree.childs, args, fullPath)
      }
    } else {
      // console.log('creating file', chalk.green(fullPath))
      const fileContents = await parseFileContent(args, tree.contents)
      fs.writeFileSync(fullPath, fileContents)
    }
  }
}

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
export const askQuestion = util.promisify(rl.question).bind(rl)
