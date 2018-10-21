import Data from './data';

// extend page
export default function extendPage(page) {
  page.$data = new Data();
}
