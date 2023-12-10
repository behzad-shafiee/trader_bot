import * as fs from 'fs'

let authMemberAccessTokenPrivateKey: string
try
{
    authMemberAccessTokenPrivateKey = fs.readFileSync( '/home/storage/app/keys/auth/member/access-token/private.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "private.key" of "access-token" =>', e )
    authMemberAccessTokenPrivateKey = ''
}

let authMemberAccessTokenPublicKey: string
try
{
    authMemberAccessTokenPublicKey = fs.readFileSync( '/home/storage/app/keys/auth/member/access-token/public.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "public.key" of "access-token" =>', e )
    authMemberAccessTokenPublicKey = ''
}

let authMemberRefreshTokenPrivateKey: string
try
{
    authMemberRefreshTokenPrivateKey = fs.readFileSync( '/home/storage/app/keys/auth/member/refresh-token/private.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "private.key" of "refresh-token" =>', e )
    authMemberRefreshTokenPrivateKey = ''
}

let authMemberRefreshTokenPublicKey: string
try
{
    authMemberRefreshTokenPublicKey = fs.readFileSync( '/home/storage/app/keys/auth/member/refresh-token/public.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "public.key" of "refresh-token" =>', e )
    authMemberRefreshTokenPublicKey = ''
}

let authManagerialAccessTokenPrivateKey: string
try
{
    authManagerialAccessTokenPrivateKey = fs.readFileSync( '/home/storage/app/keys/auth/managerial/access-token/private.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "private.key" of "access-token" =>', e )
    authManagerialAccessTokenPrivateKey = ''
}

let authManagerialAccessTokenPublicKey: string
try
{
    authManagerialAccessTokenPublicKey = fs.readFileSync( '/home/storage/app/keys/auth/managerial/access-token/public.key' ).toString().trim()
}
catch ( e )
{
    console.error( 'Failed to read "public.key" of "access-token" =>', e )
    authManagerialAccessTokenPublicKey = ''
}

export default {
    auth: {
        managerial: {
            secretOrKey: 'secret',
            accessToken: {
                privateKey: authManagerialAccessTokenPrivateKey,
                publicKey: authManagerialAccessTokenPublicKey,
            },
        },
        member: {
            secretOrKey: 'secret',
            accessToken: {
                privateKey: authMemberAccessTokenPrivateKey,
                publicKey: authMemberAccessTokenPublicKey,
            },
            refreshToken: {
                privateKey: authMemberRefreshTokenPrivateKey,
                publicKey: authMemberRefreshTokenPublicKey,
            },
        },
    },
}