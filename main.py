import io
from mod.modules.RSA import RSA
from mod.modules.FileReader import FileReader
from base64 import b64encode
import eel
import binascii

eel.init('web')


# RSA KEY GENERATION
@eel.expose
def rsa_key_gen():
    pubkey, privkey = RSA.generate_key()
    return (pubkey, privkey)


# RSA ENCRYPTION
@eel.expose
def rsa_encrypt(public_key, plainString):
    n = public_key[0]
    e = public_key[1]
    public_key = (n, e)
    cipherString, time_taken_encrypt = RSA.encrypt(plainString, public_key)
    return (cipherString, time_taken_encrypt)


# RSA DECRYPTION
@eel.expose
def rsa_decrypt(private_key, cipherString):
    n = private_key[0]
    d = private_key[1]
    private_key = (n, d)
    plainString, time_taken_decrypt = RSA.decrypt(cipherString, private_key)
    return (plainString, time_taken_decrypt)


eel.start('index.html', size=(1050, 650))
