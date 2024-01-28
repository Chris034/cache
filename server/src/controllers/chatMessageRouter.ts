async function getMessagesByRoom(req, res)
{
    return res.status(200).json({ success: true });} 

async function getUserById(req, res)
{
    return {}
}


export default {
    getMessagesByRoom,
    getUserById,
  }