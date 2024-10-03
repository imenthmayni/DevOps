package tn.esprit.se.pispring.Controller;

import tn.esprit.se.pispring.DTO.MessageDTO;
import tn.esprit.se.pispring.Service.ChatExceptions.ChatAlreadyExistException;
import tn.esprit.se.pispring.Service.ChatExceptions.ChatNotFoundException;
import tn.esprit.se.pispring.Service.ChatExceptions.NoChatExistsInTheRepository;
import tn.esprit.se.pispring.entities.Chat;
import tn.esprit.se.pispring.entities.Message;
import tn.esprit.se.pispring.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/add")
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) throws IOException {

        try {
            return new ResponseEntity<Chat>(chatService.addChat(chat), HttpStatus.CREATED);
        } catch (ChatAlreadyExistException e) {
            return new ResponseEntity("Chat Already Exist", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/add/message1")
    public ResponseEntity<Message> addMessage2(@RequestBody MessageDTO message) throws Exception {
            return new ResponseEntity<Message>(chatService.addMessage2(message), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Chat>> getAllChats() {
        try {
            return new ResponseEntity<List<Chat>>(chatService.findallchats(), HttpStatus.OK);
        } catch (NoChatExistsInTheRepository e) {
           return new ResponseEntity("List not found", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/all/messages/from/chat/{chatId}")
    public ResponseEntity<?> getAllMessagesInChat(@PathVariable int chatId) {
        try {
            Chat chat = new Chat();
            chat.setChatId(chatId);
            List<Message> messageList = this.chatService.getAllMessagesInChat(chatId);
            return ResponseEntity.ok(messageList);
        } catch (NoChatExistsInTheRepository e) {
            return new ResponseEntity("Message List not found", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable int id) {
        try {
            return new ResponseEntity<Chat>(chatService.getById(id), HttpStatus.OK);
        } catch (ChatNotFoundException e) {
           return new ResponseEntity("Chat Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/firstUserName/{username}")
    public ResponseEntity<?> getChatByFirstUserName(@PathVariable String username) {
        try {
            HashSet<Chat> byChat = this.chatService.getChatByFirstUserName(username);
            return new ResponseEntity<>(byChat, HttpStatus.OK);
        } catch (ChatNotFoundException e) {
            return new ResponseEntity("Chat Not Exits", HttpStatus.CONFLICT);
        }
    }



    @GetMapping("/secondUserName/{username}")
    public ResponseEntity<?> getChatBySecondUserName(@PathVariable String username) {

        try {
            HashSet<Chat> byChat = this.chatService.getChatBySecondUserName(username);
            return new ResponseEntity<>(byChat, HttpStatus.OK);
        } catch (ChatNotFoundException e) {
            return new ResponseEntity("Chat Not Exits", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getChatByFirstUserNameOrSecondUserName/{username}")
    public ResponseEntity<?> getChatByFirstUserNameOrSecondUserName(@PathVariable String username) {

        try {
            HashSet<Chat> byChat = this.chatService.getChatByFirstUserNameOrSecondUserName(username);
            return new ResponseEntity<>(byChat, HttpStatus.OK);
        } catch (ChatNotFoundException e) {
            return new ResponseEntity("Chat Not Exits", HttpStatus.CONFLICT);
        }
    }

//
//    @GetMapping("/getChatByFirstUserNameAndSecondUserName")
//    public ResponseEntity<?> getChatByFirstUserNameAndSecondUserName(@RequestBody Map<String, String> requestParams) {
//
//        String firstUserName = requestParams.get("firstUserName");
//        String secondUserName = requestParams.get("secondUserName");
//
//        try {
//            HashSet<Chat> chatByBothEmail = this.chatService.getChatByFirstUserNameAndSecondUserName(firstUserName, secondUserName);
//            return new ResponseEntity<>(chatByBothEmail, HttpStatus.OK);
//        } catch (ChatNotFoundException e) {
//            return new ResponseEntity<>("Chat Not Exits", HttpStatus.NOT_FOUND);
//        }
//    }
@GetMapping("/getChatByFirstUserNameAndSecondUserName")
public ResponseEntity<?> getChatByFirstUserNameAndSecondUserName(
        @RequestParam("firstUserName") String firstUserName,
        @RequestParam("secondUserName") String secondUserName) {

    try {
        HashSet<Chat> chatByBothEmail = this.chatService.getChatByFirstUserNameAndSecondUserName(firstUserName, secondUserName);
        return new ResponseEntity<>(chatByBothEmail, HttpStatus.OK);
    } catch (ChatNotFoundException e) {
        return new ResponseEntity<>("Chat Not Exists", HttpStatus.NOT_FOUND);
    }
}



    @PutMapping("/message/{chatId}")
    public ResponseEntity<Chat> addMessage(@RequestBody Message add , @PathVariable int chatId) throws ChatNotFoundException {
        return new ResponseEntity<Chat>(chatService.addMessage(add,chatId), HttpStatus.OK);
    }

}
