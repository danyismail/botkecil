

app.get('/', (req, res) => res.send('Bot kecil aktif'))

app.listen(process.env.PORT || 5000, () => console.log(`botkecil listening on port ${port}!`))