class ChatController {
    index(req, res) {
        res.render('../public/views/pages/chat', { reqData: req.conversationUsers })
    }
}

module.exports = new ChatController();