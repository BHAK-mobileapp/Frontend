import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Alert,
	Image,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

export default function PostProduct() {
	const router = useRouter();
	const [images, setImages] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [address, setAddress] = useState('');

	const pickImage = async () => {
		try {
			const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!permission.granted) {
				Alert.alert('Quyền bị từ chối', 'Cần quyền truy cập ảnh để chọn hình.');
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 0.7,
			});

			if (!result.canceled) {
				// expo-image-picker v14+ returns an array under assets
				// fallback to uri property if older version
				// @ts-ignore
				const uri = result.assets?.[0]?.uri ?? (result as any).uri;
				if (uri) setImages((prev) => [...prev, uri]);
			}
		} catch (err) {
			Alert.alert('Lỗi', 'Không thể chọn ảnh.');
		}
	};

	const removeImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const submit = async () => {
		if (!name.trim() || !price.trim() || images.length === 0) {
			Alert.alert('Thiếu thông tin', 'Vui lòng điền tên, giá và ít nhất một ảnh.');
			return;
		}

		try {
			// create folder in app documentDirectory for posted images
			const dir = FileSystem.documentDirectory + 'posted_images/';
			const dirInfo = await FileSystem.getInfoAsync(dir);
			if (!dirInfo.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

			const storedImageUris: string[] = [];
			for (const uri of images) {
				// derive filename
				const nameParts = uri.split('/');
				const filename = `${Date.now()}_${nameParts[nameParts.length - 1]}`;
				const dest = dir + filename;
				try {
					// copy image to app FS
					await FileSystem.copyAsync({ from: uri, to: dest });
					storedImageUris.push(dest);
				} catch (e) {
					// if copy fails, fallback to original uri
					storedImageUris.push(uri);
				}
			}

			const newProduct = {
				id: Date.now(),
				images: storedImageUris,
				name,
				price,
				description,
				category,
				address,
			};

			// persist to AsyncStorage
			const raw = await AsyncStorage.getItem('postedProducts');
			const list = raw ? JSON.parse(raw) : [];
			list.unshift(newProduct);
			await AsyncStorage.setItem('postedProducts', JSON.stringify(list));

			Alert.alert(
				'Thông báo',
				'Sản phẩm của bạn đang chờ duyệt và sẽ được đăng sau vài phút!',
				[{ text: 'OK', onPress: () => router.replace('/home') }]
			);
			console.log('New product saved:', newProduct);

			// reset form
			setImages([]);
			setName('');
			setPrice('');
			setDescription('');
			setCategory('');
			setAddress('');
		} catch (err) {
			Alert.alert('Lỗi', 'Không thể lưu sản phẩm.');
			console.error(err);
		}
	};

	const categories = ['Điện tử', 'Gia dụng', 'Thời trang', 'Sách', 'Đồ chơi', 'Khác'];

	const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 44;
	const HEADER_HEIGHT = STATUS_BAR_HEIGHT;

	return (
		<View style={[styles.container, { paddingTop: HEADER_HEIGHT }]}>
			<Stack.Screen options={{ headerShown: true, title: 'Đăng sản phẩm mới' }} />
			<ScrollView contentContainerStyle={styles.content}>

				<Text style={styles.label}>Ảnh sản phẩm</Text>
				<View style={styles.imageRow}>
					{images.map((uri, idx) => (
						<View key={idx} style={styles.imageWrap}>
							<Image source={{ uri }} style={styles.image} />
							<TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(idx)}>
								<Text style={styles.removeBtnText}>X</Text>
							</TouchableOpacity>
						</View>
					))}
					<TouchableOpacity style={styles.addImage} onPress={pickImage}>
						<Text style={styles.addImageText}>Thêm</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.label}>Tên sản phẩm</Text>
				<TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tên sản phẩm" />

				<Text style={styles.label}>Giá thành</Text>
				<TextInput
					style={styles.input}
					value={price}
					onChangeText={setPrice}
					placeholder="VD: 150000"
					keyboardType="numeric"
				/>

				<Text style={styles.label}>Mô tả</Text>
				<TextInput
					style={[styles.input, styles.textarea]}
					value={description}
					onChangeText={setDescription}
					placeholder="Mô tả ngắn về sản phẩm"
					multiline
					numberOfLines={4}
				/>

				<Text style={styles.label}>Danh mục</Text>
				<View style={styles.categoryRow}>
					{categories.map((c) => (
						<TouchableOpacity
							key={c}
							style={[styles.categoryBtn, category === c && styles.categoryBtnActive]}
							onPress={() => setCategory(c)}
						>
							<Text style={[styles.categoryText, category === c && styles.categoryTextActive]}>{c}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.label}>Địa chỉ bán</Text>
				<TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Ví dụ: Quận 1, TP.HCM" />

				<TouchableOpacity style={styles.submitBtn} onPress={submit}>
					<Text style={styles.submitText}>Đăng sản phẩm</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F5F5F5' },
	content: { padding: 20, paddingBottom: 40 },
	title: { fontSize: 22, fontWeight: '700', color: '#92E3A9', marginBottom: 16 },
	label: { fontSize: 14, color: '#333', marginBottom: 8, marginTop: 12 },
	imageRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
	imageWrap: { position: 'relative', marginRight: 10 },
	image: { width: 80, height: 80, borderRadius: 8 },
	removeBtn: {
		position: 'absolute',
		top: -6,
		right: -6,
		backgroundColor: '#ff6666',
		width: 22,
		height: 22,
		borderRadius: 11,
		alignItems: 'center',
		justifyContent: 'center',
	},
	removeBtnText: { color: '#fff', fontWeight: '700' },
	addImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center',
	},
	addImageText: { color: '#666' },
	input: {
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 8,
		padding: 10,
		backgroundColor: '#fff',
	},
	textarea: { minHeight: 90, textAlignVertical: 'top' },
	categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
	categoryBtn: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: '#f0f0f0',
		borderRadius: 20,
		marginRight: 8,
		marginBottom: 8,
	},
	categoryBtnActive: { backgroundColor: '#92E3A9' },
	categoryText: { color: '#333' },
	categoryTextActive: { color: '#fff' },
	submitBtn: {
		marginTop: 20,
		backgroundColor: '#92E3A9',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	submitText: { color: '#fff', fontWeight: '700' },
});
