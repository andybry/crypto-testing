# Crypto Testing

Experimentation and research in cryptography.

Contains a number of experimental utilities for building cryptographic primitives and
a few experimental implementations.

It is hoped that some of the items here will be useful for other people who are also
studying cryptography in a JavaScript context.

In particular the implementations, computation algorithms and tests could be useful to help
improve understanding.

## Installation

`npm install @andybry/crypto-testing`

# Utilities

- `shared/big-int`: working with and converting to and from big ints
- `shared/bit`: working with and converting to and from bits
- `shared/byte`: working with and converting to and from bytes
- `shared/curve`: elliptic curve implementation
- `shared/fp2`: implementation of field of order p squared
- `shared/random`: secure random generators
- `shared/secp256k1`: parameters and associated elliptic curve implementation
- `shared/string`: working with and converting to and from string representations of data
- `shared/zn`: implementation of field of order p (or could be used for rings if n is not prime)

## Scripts

- `npm run des`: implementation of the Data Encryption Standard (for 1 64-bit block)
- `npm run des:node`: the same thing using nodes `crypto` API for comparison
- `npm run ecdsa`: demonstrates the implentation of ECDSA using secp256k1
- `npm run ecdsa:vs-ethereum`: compares local signing and recovery with the Ethereum version (from web3.js)