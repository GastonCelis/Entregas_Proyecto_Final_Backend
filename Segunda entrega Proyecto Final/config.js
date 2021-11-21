const config = {
    mongodb: {
        host: "mongodb://127.0.0.1/ecommerce",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },

    firestore: {
        "type": "service_account",
        "project_id": "ecommerce-backend-5a1eb",
        "private_key_id": "3a55f443781d76bbaefbf0f5539547bfd3e9aa7b",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhKPpGBpIpXxRL\nb45icp1iXE9VbThQbPPysfkXBcbxrpX0SeyJXTkaejIxIM36d+EuTA/UkYCl1Nk0\n3H4dGTM2xY6XG0p8Unkr0hOgr4Iy81fXVlhEsqov29oqZJzgygOz4mkT8RO/pOUx\nSLHOswelA+ZPBshTiLEHBwC9n0MPaebQ1YY62PZVRMSZi+TpAvZMg7eGYkUtGWwR\nhsdJaoin10Yj1mpXka/hC2BhJ3Gz9sxrgM3YVToXghjF1CXnToBHNX7UReVDPVzT\n42M2HYhDqHWWkDscthrEAfkAtoHwVnkhl64OV1U3UfyxvQD9it3D1I9tA2iAkWGe\nA0u2VsmVAgMBAAECggEAYVaBu7wje9cqwuHbQBwkhd06PsgUzFANtiHSeW158Al1\nskIzC79NbHDfOfXgliM1Kfqf7VlpsEcwD3Yy3wmB5m/JkPGvZceRsqwC6Dh3pOcm\nVmVxi2FhyYbV7fXJDDTJHP8IRiK2UudKXd/7XkxvRZtF+WwJNnOldFBGtbMgHozu\nLuydfKJ1FJnauDBcfwOEgJUadVgHAXnA1hyu8dW3F1ZdHDEfm5zeZkBYFQTDEs01\nv29YK5SdY6/f6VPbcqrD2E4MlzSlOX1QCy+5577Sz4WdiFdvwXLPZ9ddSEjTm5q6\ngENJvwvyXzRFH8DhPDbTtgdW3ga1DJynN8MiKlYPEQKBgQDy4fBJPJF44UTYCzyW\n8vYkPq11cI5W6jlKXPSbnD6FjAh2gr+7BbmMRRbS9dAMXnpidTSduagdukxXacEH\n2tHGlzSgc4qPokDLyN0lRY4d71A5WvnsL+hAAzziNhUmCAXPieMB/5VGi8ytv82F\n0x25c7JQtRdWk1KfwAQTmfbwVwKBgQDtUgKVImwyGo5CxjsqsPsdaTpPb57VauD6\na1TvXgyYekWuUY3ZhyaWTGqJryyHkK96lP25sHgwWS/LnQaIW7qByGs6o6g/RfS1\nr/uIptu529co163x4p/yAUvIi509XOQR+3rlyvmPWKhKrhPCdzq5JEPQSiRaU7sg\nYIYWRJAx8wKBgQC19I+3vflZbqHNnDVq/F9r7cyzA3yPHm+HBzZ08UthbvPUHMWY\nTYSg0g10Q5T1/z1+T0H4u2J3yt5wShjDUqn/Nb3GSmjOjAYw5KzPxFjgki0umrpK\nt+UtN3/AFDYpxK7duPXoxFlHfWn77IoCrJNDIKrAjboLMNkgNpCXQqvdhwKBgQDU\njiF2BXC2p4ZHVFjl8cHYI8lwIF84cxOx9rQJ+Eh7wPfsG2tbK2tqLmM1kknl2bbx\nqcRerinX0+m1Cp0xQEcZurIfwTkOAtAcctRtHlWqb7aUBCjtfrcXAAYqRrG8phg3\n6u+2JUfEFfoVeTiFcliMPmjmg6FvrZLqesld5Gbp9QKBgEvdvmRWidNcuCsfEalx\ny/Xs1Ep1+9HI2oKd2b7OPp6yTE4ScDB1/fRskIpPoz64sfpkBam1Qd9VIMOYXMHV\npw/JSqB7OEq9dyPfpaM17GUaa0dd5oh2Smioegi5g4Cy4ptP+OEPFmmVUqrSI/Sr\nXHINhRydCy7zYoR5dkRjhCvM\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-hbots@ecommerce-backend-5a1eb.iam.gserviceaccount.com",
        "client_id": "103280331230246759210",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hbots%40ecommerce-backend-5a1eb.iam.gserviceaccount.com"
    },
    
    file: {
        path: './data'
    },

    memory: {
        array: []
    }
}

module.exports = config