const { SlashCommandBuilder } = require("discord.js");
const { runCommand } = require("../utils/os");
const { errorHandler } = require("../utils/helper");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete all files stored"),
    async execute(interaction) {
        try {
            // Ignore error when trying to delete nsjail directories
            await runCommand("rm * || true", interaction.guildId);
        }
        catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply("All files have been deleted.");
    },
};

