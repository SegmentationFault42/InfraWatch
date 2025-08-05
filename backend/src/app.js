const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'InfraWatch Backend API running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
