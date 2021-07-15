module.exports = class Command {
    constructor({
        name = null,
        description = null,
        aliases = [],
        dirname = null,
        subcommands = [],
        cooldown = 3000,
        explaples = [],
        permissions = {},
        requires = {}
    }, client) {
        this.client = client
        this.name = name
        this.description = description
        this.aliases = aliases
        this.dirname = dirname
        this.subcommands = subcommands
        this.cooldown = cooldown
        this.explaples = explaples
        this.permissions = permissions
        this.requires = requires
    }

    verifyPerms(member, me) {
        let data = {
            me: {
                has: true
            },
            member: {
                has: true,
                type: "member"
            }
        }

        if(this.permissions.me) if(me.hasPermission(this.permissions.me)) data.me.has = false

        if(this.requires.owner) {
            if(!this.client.config.owners.includes(member.user.id)) data.member = {
                has: false,
                type: "owner"
            }
            else data.member = {
                has: true,
                type: "owner"
            }
        } else if(this.permissions.Discord) {
            if(!member.hasPermission(this.permissions.Discord)) data.member.has = false
            else data.member.has = true
        }

        return data
    }
}