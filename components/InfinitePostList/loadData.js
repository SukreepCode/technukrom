import dateFormat from 'dateformat';
import firebaseInit from '../../stores/firebaseInit'

const handleQuery = (ref) => {
  // Fetch query of given reference
  return new Promise((resolve, reject) => {
    ref.get().then((documentSnapshots) => {

      let i = 0;
      var tmp_data = []
      documentSnapshots.forEach((doc) => {

        tmp_data.push({
          "post_index": i++,
          "id": doc.id,
          "title": doc.data().title,
          "link": doc.data().link,
          "author": doc.data().author,
          "published": dateFormat(doc.data().published.toDate(), "mediumDate"),
          "isLoading": false,
          "tags": doc.data().tags === undefined ? [] : doc.data().tags
        });
      });

      // Build a reference for next page
      const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1];
      if (!lastVisible) return;

      resolve({
        data: tmp_data,
        refNext: ref.startAfter(lastVisible)
      });

    })
  })
}

const getData = async (num_data, refNext, refInitQuery) => {

  try {
    let currentData;
    // No prefetch data, then get current page
    if (refNext === null) {
      // Perform query from first query (first visible)
      currentData = handleQuery(refInitQuery.limit(num_data));
    } else {
      // Perform query from last visible page
      currentData = handleQuery(refNext.limit(num_data));
    }

    return currentData;

  } catch (e) {
    throw Error('Query error', e);
  }
}

export default getData;
