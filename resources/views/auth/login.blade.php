@extends("layouts.login")
@section('content')
    <div id="container" class="cls-container">
        <!-- BACKGROUND IMAGE -->
        <!--===================================================-->
        <div id="bg-overlay" class="bg-img" style="background-image: url('/nifty/img/bg-img/bg-img-7.jpg');"></div>

        <div class="cls-content">
            <div class="cls-content-sm panel">
                <div class="panel-body">
                    <div class="mar-ver pad-btm">
                        <h3 class="h4 mar-no">Đăng nhập hệ thống</h3>
                    </div>
                    <form method="post">
                        <input type="hidden" value="{!! csrf_token() !!}" name="_token">
                        @if(Session::has('message'))
                            <div class="alert alert-danger fade in">
                                <button class="close" data-dismiss="alert"><span>×</span></button>
                                {{Session::get('message')}}
                            </div>
                        @endif
                        @if(count($errors->all()))
                            <div class="alert alert-danger fade in">
                                <button class="close" data-dismiss="alert"><span>×</span></button>
                                Username hoặc password không chính xác!
                            </div>
                        @endif
                        <div class="form-group">
                            <input name="username" type="text" placeholder="Username" class="form-control" value="{{ old('username') }}" autofocus>
                        </div>
                        <div class="form-group">
                            <input name="password" type="password" placeholder="Mật khẩu" class="form-control" value="{{ old('password') }}">
                        </div>
                        <div class="checkbox pad-btm text-left">
                            <input value="1" id="demo-form-checkbox" class="magic-checkbox" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                            <label for="demo-form-checkbox">Ghi nhớ</label>
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Đăng nhập</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection


