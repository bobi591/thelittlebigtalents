import { InteractiveBrowserCredential } from '@azure/identity'
import { BlobServiceClient } from '@azure/storage-blob'

export default class AzureBlobStorage {
    private readonly storageClient: BlobServiceClient
    private readonly blobsUrlCache: Map<string, string>

    private constructor() {
        this.storageClient = new BlobServiceClient(
            process.env.REACT_APP_AZURE_BLOB_URL!,
            new InteractiveBrowserCredential({
                clientId:
                    process.env.REACT_APP_AZURE_APP_REGISTRATION_CLIENT_ID!,
                tenantId:
                    process.env.REACT_APP_AZURE_APP_REGISTRATION_TENANT_ID!,
            })
        )
        this.blobsUrlCache = new Map<string, string>();
    }

    private getBlobUrl(blobName: string): string {
        if(!this.blobsUrlCache.has(blobName)) {
            const containerClient = this.storageClient.getContainerClient(
                process.env.REACT_APP_AZURE_BLOB_CONTAINER!
            )
            this.blobsUrlCache.set(blobName, containerClient.getBlobClient(blobName).url)
        }
        return this.blobsUrlCache.get(blobName)!;
    }

    private static readonly INSTANCE: AzureBlobStorage = new AzureBlobStorage()

    static getBlobUrl(blobName: string): string {
        return AzureBlobStorage.INSTANCE.getBlobUrl(blobName);
    }
}
