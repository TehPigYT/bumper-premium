module.exports = async(Bumper, member) => { // GuildMemberRemove Event.
  
  if(member.user.id === "478730166680420373") { console.log(`Bumper was removed so Bumper Premium will leave.`), member.guild.leave() };
  
};