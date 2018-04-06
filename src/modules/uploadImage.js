import azure from 'azure-storage.blob.export.js'
const AZURE_STORAGE_ACCOUNT = 'quicksells'
const AZURE_STORAGE_ACCESS_KEY =
  'TXs6KNEnN+rSNYs3tiSUOvnMzaMBe98mE0GqrJLa//NBghggvGvLbZf5ko4cnrfXc7bVJwBkv56SY4ABN3BBuQ=='
const blobUri = 'https://' + AZURE_STORAGE_ACCOUNT + '.blob.core.windows.net'
const blobService = azure.createBlobServiceWithSas(blobUri, 'SAS_TOKEN')

console.log(azure)

export default function uploadImage(file) {
  console.log(file)

  var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512
  blobService.singleBlobPutThresholdInBytes = customBlockSize

  var finishedOrError = false
  blobService.createBlockBlobFromBrowserFile(
    'images',
    file.name,
    file,
    { blockSize: customBlockSize },
    function(error, result, response) {
      finishedOrError = true
      if (error) {
        // Upload blob failed
      } else {
        // Upload successfully
      }
    }
  )
  /*
  blobService.createBlockBlobFromLocalFile('images', 'test', file, function(
    error,
    result,
    response
  ) {
    if (!error) {
      console.log(response)
    }
  })
  */
}
