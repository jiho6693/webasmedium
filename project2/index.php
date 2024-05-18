<?php
include('includes/config.php');
include('includes/database.php');
include('includes/functions.php');

include('includes/home_header.php');
?>

<?php
if (isset($_GET['delete'])){
    if ($stm = $connect->prepare('DELETE FROM posts where id = ?')){
        $stm->bind_param('i',  $_GET['delete']);
        $stm->execute();

        set_message("A post  " . $_GET['delete'] . " has beed deleted");
        header('Location: posts.php');
        $stm->close();
        die();

    } else {
        echo 'Could not prepare statement!';
    }
}

if ($stm = $connect->prepare('SELECT * FROM posts')){
    $stm->execute();
    $result = $stm->get_result();

    if ($result->num_rows >0){
        // 데이터를 배열로 가져옴
        $posts = [];
        while($record = mysqli_fetch_assoc($result)){
            $posts[] = $record;
        }
        // 배열을 무작위로 섞음
        shuffle($posts);
?>
    <div class="info">This website constantly changes the order, arrangement, and styles of its content.</div>
    </hr>
   
    <div class="admin"><a href="login.php">UPLOAD</a></div>
    <div class="fire"><a href="test_fire/index.html">FIRE</a></div>
    <div class="contents">
        <?php foreach($posts as $post){ ?>
            <div class="text"><?php echo $post['content']; ?></div>
        <?php } ?>
    </div>
<?php
   } else {
        echo 'No posts found';
   }
   $stm->close();
} else {
    echo 'Could not prepare statement!';
}
include('includes/footer.php');
?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
<script>
    window.onload = function() {
        updateStyles(); // 페이지가 로드될 때 한 번 실행
        // setInterval(updateStyles, 5000); // 5초마다 실행
    };

    function updateStyles() {
        var container = document.querySelector('.contents');
        var randomColumnCount = Math.floor(Math.random() * 5) + 1;
        var columns = '';
        for (var i = 0; i < randomColumnCount; i++) {
            columns += '1fr ';
        }
        container.style.gridTemplateColumns = columns;

        // 배경색과 폰트 색상을 무작위로 선택
        var randomBackgroundColor = getRandomColor();
        var randomFontColor = getRandomColor();

        document.body.style.backgroundColor = randomBackgroundColor; // 페이지 전체 배경색 변경
        document.body.style.color = randomFontColor; // 페이지 전체 폰트 색상 변경

        // 폰트 정보를 가져옴
        var randomFont = getRandomFont();

        // 색상 및 폰트 정보를 한 번에 표시
        var styleInfo = document.createElement('div');
        styleInfo.className = 'style-info'; // 클래스 추가
        styleInfo.innerHTML = 'BACKGROUND COLOR: ' + randomBackgroundColor + '<br>FONT COLOR: ' + randomFontColor + '<br>FONT: ' + randomFont;
        container.appendChild(styleInfo);
    }

    // 무작위 색상 생성 함수
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomFont() {
        var fonts = [
            "Arial, sans-serif",
            "Verdana, sans-serif",
            "Georgia, serif",
            "Courier New, monospace",
            "Times New Roman, serif"
            // 추가 폰트를 원한다면 이곳에 추가
        ];
        var randomIndex = Math.floor(Math.random() * fonts.length);
        return fonts[randomIndex];
    }
</script>