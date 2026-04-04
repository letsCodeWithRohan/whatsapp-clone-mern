const crypto = require("crypto")

const algo = "aes-256-cbc";
const key = crypto.createHash("sha256").update(process.env.SECRET_KEY).digest(); // FIX

function encrypt(message) {
    let iv = crypto.randomBytes(16);

    let cipher = crypto.createCipheriv(algo, key, iv);

    let encryptedMessage = cipher.update(message, "utf8", "hex");
    encryptedMessage += cipher.final("hex");

    return {
        message: encryptedMessage,
        iv: iv.toString("hex")
    };
}

function decrypt(encmessage,iv){
    const decipher = crypto.createDecipheriv(algo,key,Buffer.from(iv,"hex"));
    let decrypted = decipher.update(encmessage,"hex","utf8");
    decrypted += decipher.final("utf8");

    return decrypted;

}

module.exports = {
    encrypt,
    decrypt
}