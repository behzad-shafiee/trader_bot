
export class AccountMemberModel
{
    id?: string
    nickname?: string
    mobileNumber: string
    countryCode?: string
    mediaId?: string
    subscription?: { type: string, expiredAt: Date }

    toString()
    {
        return JSON.stringify({
            id: this.id,
            nickname: this.nickname,
            mobileNumber: this.mobileNumber,
            countryCode: this.countryCode,
            mediaId: this.mediaId,
            suscription: this.subscription,
        })
    }
}