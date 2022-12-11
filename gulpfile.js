/* Vars */

const srcFolder = 'src'
const distFolder = 'dist'

/* Modules */

import pkg from 'gulp'
const { gulp, series, parallel, src, dest, watch } = pkg

import rename     from 'gulp-rename'
import translit from 'speakingurl'
import {deleteAsync} from 'del'

/* Rename */

function renameFiles() {
  return src(`${srcFolder}/**/*.*`)
  .pipe(rename(function(path){

    let trlFileName = translit(path.basename, {
      lang: 'en'
    })

    let trlDirName = translit(path.dirname, {
      lang: 'en'
    })

    path.basename = trlFileName
    path.dirname = trlDirName
    // path.dirname: "main/text/ciao"
    // path.basename: "aloha"
    // path.prefix: "test-"
    // path.suffix: "-test"
    // path.extname: ".md"
  }))
  .pipe(dest(distFolder))
}

/* Clear */

function clear() {
  return deleteAsync([distFolder])
}

/* Exports */

export { renameFiles, clear }
export default series(await clear, renameFiles)
