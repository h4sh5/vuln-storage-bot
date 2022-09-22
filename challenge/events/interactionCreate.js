module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isChatInputCommand() || !interaction.guild) return;

        const guildRoles = await interaction.guild.roles.fetch();
        const roleManager = interaction.member.roles;
        const roles = [];
        guildRoles.map((a) => {
            const temp = roleManager.resolve(a.id);
            if (temp != null) {
                roles.push(temp.name);
            }
        });

        const isOrganiser = roles.some((a) => {
            return a === "Organiser";
        });

        if (!isOrganiser) {
            return await interaction.reply("You're not an organiser so you can't use this bot.");
        }

        const command = interaction.client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    },
};