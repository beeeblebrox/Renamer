/* Vars */

const srcFolder = 'src';
const distFolder = 'dist';

/* Modules */

import gulp from 'gulp';
import rename from 'gulp-rename';
import translit from 'speakingurl';
import { deleteAsync } from 'del';

/* Rename */

function renameFiles() {
  return gulp.src(`${srcFolder}/**/*.*`)
    .pipe(rename(function (path) {
      const trlFileName = translit(path.basename, {
        lang: 'en',
      });

      const trlDirName = translit(path.dirname, {
        lang: 'en',
      });

      path.basename = trlFileName;
      path.dirname = trlDirName;
    }))
    .pipe(gulp.dest(distFolder));
}

/* Clear */

async function clear() {
  await deleteAsync([distFolder]);
}

/* Exports */

export { renameFiles, clear };

// Используйте функцию для корректной обработки асинхронности
const build = gulp.series(clear, renameFiles);
export default build;