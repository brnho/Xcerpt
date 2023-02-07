const null_null = `select * from excerpts`;
const null_oldestFirst = `select * from excerpts order by timestamp asc`;
const null_newestFirst = `select * from excerpts order by timestamp desc`;
const null_pageAsc = `select * from excerpts order by page asc`;
const null_pageDesc = `select * from excerpts order by page desc`;

const chapter_null = `select * from excerpts where chapter = ?`;
const chapter_oldestFirst = `select * from excerpts where chapter = ? order by timestamp asc`;
const chapter_newestFirst = `select * from excerpts where chapter = ? order by timestamp desc`;
const chapter_pageAsc = `select * from excerpts where chapter = ? order by page asc`;
const chapter_pageDesc = `select * from excerpts where chapter = ? order by page desc`;


const starred_null = `select * from excerpts where starred = 1`;
const starred_oldestFirst = `select * from excerpts where starred = 1 order by timestamp asc`;
const starred__newestFirst = `select * from excerpts where starred = 1 order by timestamp desc`;
const starred__pageAsc = `select * from excerpts where starred = 1 order by page asc`;
const starred__pageDesc = `select * from excerpts where starred = 1 order by page desc`;

export {
    null_null, null_oldestFirst, null_newestFirst, null_pageAsc, null_pageDesc,
    chapter_null, chapter_oldestFirst, chapter_newestFirst, chapter_pageAsc, chapter_pageDesc,
    starred_null, starred_oldestFirst, starred__newestFirst, starred__pageAsc, starred__pageDesc
};

