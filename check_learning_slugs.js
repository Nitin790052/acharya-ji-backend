const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nitinkumar79005205_db_user:QE0o6sPJ9U9TYYwg@cluster0.askiz4p.mongodb.net/acharya_ji')
  .then(async () => {
    const db = mongoose.connection.db;
    const res = await db.collection('learningpagecontents').find({}).toArray();
    console.log(JSON.stringify(res.map(r => ({ pageName: r.pageName, slug: r.slug })), null, 2));
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
