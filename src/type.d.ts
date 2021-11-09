interface TreeItem {
  type: 'file' | 'directory'
  name: string
  contents?: string[]
  description?: string
  childs?: TreeItem[]
}

interface InitProps {
  appName?: string
  dbHost?: string
  dbUser?: string
  dbPass?: string
  dbName?: string
  author?: string
  license?: string
  gitUrl?: string
  swaggerUser?: string
  swaggerPass?: string
}
