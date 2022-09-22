const { SlashCommandBuilder } = require("discord.js");
const { runCommand } = require("../utils/os");
const { errorHandler } = require("../utils/helper");
const quote = require("shell-quote").quote;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete a file")
        .addStringOption(option => option.setName("filename").setDescription("Name of file to delete").setRequired(true)),
    async execute(interaction) {
        const filename = quote(interaction.options.getString("filename").toUpperCase().split(" "));

        try {
            await runCommand(`rm ${filename}`, interaction.guildId);
        }
        catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply(`File '${filename}' has been deleted.`);
    },
};

