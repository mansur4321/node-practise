import * as fileSystem from 'node:fs'
import * as path from 'node:path'

// fileSystem.readFile(
//     'src/static/file.txt',
//     'utf-8',
//     (err, data) => {
//         console.log(data)
//     }
// )

// const data = fileSystem.readFileSync(
//     'src/static/file2.txt',
//     'utf-8',
// )
// console.log(data)
interface json {
    id: number,
    data: string,
    fileName: string
}
const jsonData: json = {
    id: 0,
    data: '',
    fileName: 'json-file.json'
}


fileSystem.readdir(
    'src/static/',
    (err, files) => {
        if (err !== null) throw err

        let data = ''

        files.forEach(file => {
            console.log(
                file + ', ',
                path.extname(file) + ', ',
                fileSystem.statSync('src/static/' + file).size
            )

            if (!fileSystem.statSync('src/static/' + file).isFile()) return

            data += fileSystem.readFileSync('src/static/' + file, 'utf-8') + '\r'
        })

        fileSystem.writeFileSync(
            'src/static/union/union-file.txt',
            data
        )
        
        jsonData.data = data
        fileSystem.writeFileSync(
            'src/static/' + jsonData.fileName,
            JSON.stringify(jsonData)
        )
    }
)