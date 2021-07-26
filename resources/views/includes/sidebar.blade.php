<?php
$user = \Auth::user();
$ac = \App\Helpers\General::get_controller_action();
?>
<!--MAIN NAVIGATION-->
<!--===================================================-->
<nav id="mainnav-container">
    <div id="mainnav">

        <!--Menu-->
        <!--================================-->
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">

                    <!--Profile Widget-->
                    <!--================================-->
                    <div id="mainnav-profile" class="mainnav-profile">
                        <div class="profile-wrap">
                            <div class="pad-btm">
                                <img class="img-circle img-sm img-border" onerror="this.src='/images/user.png';"
                                     src="{{ @$user['image_url'].@$user['image_location'] }}" alt="">
                            </div>
                            <a href="#profile-nav" class="box-block" data-toggle="collapse" aria-expanded="false">
                                            <span class="pull-right dropdown-toggle">
                                                <i class="dropdown-caret"></i>
                                            </span>
                                <p class="mnp-name">{{ @$user['name'] }}</p>
                            </a>
                        </div>
                    </div>

                    <ul id="mainnav-menu" class="list-group">
                        <?php $active = $ac['controller'] == 'HomeController'
                            ? 'active' : '';
                        ?>
                        <li class="{{$active}}">
                            <a href="{{ route('home') }}">
                                <i class="fa fa-home" aria-hidden="true"></i>
                                <span class="menu-title"><strong>Trang chủ</strong></span>
                            </a>
                        </li>
                        <?php $active = $ac['controller'] == 'CategoryController'
                            ? 'active' : ''
                        ?>
                        <li class="{{$active}}">
                            <a href="{{ route('category.index') }}">
                                <i class="fa fa-list" aria-hidden="true"></i>
                                <span class="menu-title"><strong>Quản lý danh mục</strong></span>
                            </a>
                        </li>
                        <?php $active = $ac['controller'] == 'ProductController'
                            ? 'active' : ''
                        ?>
                        <li class="{{$active}}">
                            <a href="{{ route('product.index') }}">
                                <i class="fa fa-cubes" aria-hidden="true"></i>
                                <span class="menu-title"><strong>Quản lý sản phẩm</strong></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--================================-->
        <!--End menu-->

    </div>
</nav>
<!--===================================================-->
<!--END MAIN NAVIGATION-->
