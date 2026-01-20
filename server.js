// ... (Các phần khai báo require express, mongoose, User model)

// API Đăng ký, Đăng nhập bạn để ở trên...

// TỚI ĐÂY: Dán đoạn code Kết bạn vào đây
app.post('/add-friend', async (req, res) => {
    try {
        const { myPhone, friendPhone } = req.body;

        // Không cho tự kết bạn với chính mình
        if (myPhone === friendPhone) {
            return res.status(400).json({ message: "Bạn không thể tự kết bạn với chính mình!" });
        }

        const friendAccount = await User.findOne({ phone: friendPhone });
        if (!friendAccount) {
            return res.status(404).json({ message: "Số điện thoại này chưa đăng ký CapCas!" });
        }

        const me = await User.findOne({ phone: myPhone });
        if (me.friends.includes(friendPhone)) {
            return res.status(400).json({ message: "Số này đã có trong danh sách bạn bè!" });
        }

        me.friends.push(friendPhone);
        await me.save();
        
        // (Tùy chọn) Thêm mình vào danh sách bạn của người kia luôn
        friendAccount.friends.push(myPhone);
        await friendAccount.save();

        res.json({ message: "Kết bạn thành công!", friendName: friendAccount.username });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
});

// ... (Các phần app.listen và socket.io)
