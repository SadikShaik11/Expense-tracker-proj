const { json } = require('body-parser');
const Expense = require('../models/expenses');

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({ expense, success: true });
    }).catch(err => {
        return res.status(403).json({ success: false, error: err })
    })
}

const getexpenses = (req, res) => {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({ expenses, success: true })
    })
        .catch(err => {
            return res.status(402).json({ error: err, success: false })
        })
}

const leaderboards = (req,res)=>{
    Expense.findAll().then((members) => {
        res.json(members)
    }).catch((err) => {
       console.log(error);
    });
}
const downloadExpenses =  async (req, res) => {

    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; 
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerName = 'sadikshaik139'; 
        console.log('\t', containerName);

        const containerClient = await blobServiceClient.getContainerClient(containerName);

       
        if(!containerClient.exists()){
     
            const createContainerResponse = await containerClient.create({ access: 'container'});
            console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
        }
      
        const blobName = 'expenses' + uuidv1() + '.txt';

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log('\nUploading to Azure storage as blob:\n\t', blobName);

        const data =  JSON.stringify(await req.user.getExpenses());

        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log("Blob was uploaded successfully. requestId: ", JSON.stringify(uploadBlobResponse));

      
        const fileUrl = `https://sadikdesktop.blob.windows.net/${containerName}/${blobName}`;
        res.status(201).json({ fileUrl, success: true}); 
    } catch(err) {
        res.status(500).json({ error: err, success: false, message: 'Something went wrong'})
    }

};

module.exports = {
    getexpenses,
    addexpense,
    leaderboards,
    downloadExpenses
}